module Flux.API exposing (..)

import Http exposing (jsonBody)
import Json.Decode as Decode exposing (Decoder)
import Json.Decode.Pipeline exposing (decode, optional, required)
import Json.Encode as JE
import Navigation
import RemoteData exposing (WebData)


type ApiV
    = V0
    | V1
    | V2


apiVToString : ApiV -> String
apiVToString v =
    case v of
        V0 ->
            "v0"

        V1 ->
            "v1"

        V2 ->
            "v2"


apiProdUrl =
    "https://prod.v1.api.flux.party"


apiDevUrl =
    "https://dev.v1.api.flux.party"


createApiUrl v path =
    String.join "/" [ apiProdUrl, "api", apiVToString v, path ]


createTokenValue token =
    JE.object [ ( "s", JE.string token ) ]


apiPost : ApiV -> String -> Decode.Value -> Decoder a -> (WebData a -> msg) -> Cmd msg
apiPost v apiPath bodyVal decoder msg =
    let
        url =
            createApiUrl v apiPath

        body =
            jsonBody bodyVal
    in
    Http.post url body decoder
        |> RemoteData.sendRequest
        |> Cmd.map msg


apiGet : ApiV -> String -> Decoder a -> (WebData a -> msg) -> Cmd msg
apiGet v apiPath decoder msg =
    let
        url =
            createApiUrl v apiPath
    in
    Http.get url decoder
        |> RemoteData.sendRequest
        |> Cmd.map msg


apiReqAuthEmail : String -> (WebData GenApiResp -> msg) -> Cmd msg
apiReqAuthEmail email msg =
    let
        bodyVal =
            JE.object [ ( "email", JE.string email ) ]
    in
    apiPost V1 "send_login_email" bodyVal genApiRespDecoder msg


tempTokenToAuthToken : String -> (WebData AuthTokenApiResp -> msg) -> Cmd msg
tempTokenToAuthToken tempToken msg =
    let
        path =
            "app/login_magic_link/" ++ tempToken
    in
    apiGet V1 path authTokenRespDecoder msg


getRoles : String -> (WebData GetRolesResp -> msg) -> Cmd msg
getRoles token msg =
    let
        bodyVal =
            createTokenValue token
    in
    apiPost V0 "get_roles" bodyVal getRolesDecoder msg


type alias GenApiResp =
    { status : String, error : String }


type alias AuthTokenApiResp =
    { status : String, error : String, s : Maybe String }


type alias GetRolesResp =
    { status : String, error : String, roles : List String }


type alias WDApiResp =
    WebData GenApiResp


decodeSEHelper objConstructor =
    decode objConstructor
        |> required "status" Decode.string
        |> required "error" Decode.string


genApiRespDecoder : Decoder GenApiResp
genApiRespDecoder =
    decodeSEHelper GenApiResp


authTokenRespDecoder : Decoder AuthTokenApiResp
authTokenRespDecoder =
    decodeSEHelper AuthTokenApiResp
        |> required "s" (Decode.nullable Decode.string)


getRolesDecoder : Decoder GetRolesResp
getRolesDecoder =
    decodeSEHelper GetRolesResp
        |> required "roles" (Decode.list Decode.string)
