port module Flux.Auth exposing (..)

import Flux.API as API exposing (GenApiResp, WDApiResp)
import Flux.Models exposing (AuthModel)
import Flux.Msgs exposing (FluxMsg(..))
import Helpers.Json exposing (decodePortResp)
import Helpers.Msgs exposing (HelperMsg)
import Json.Decode as Decode
import Json.Decode.Pipeline exposing (decode, required)
import Maybe.Extra exposing (isJust)
import RemoteData exposing (WebData)


port isAuthenticated : (Decode.Value -> msg) -> Sub msg


decodeIsAuthenticated : (Result String String -> msg) -> Decode.Value -> HelperMsg msg
decodeIsAuthenticated msgConstructor val =
    decodePortResp Decode.string val msgConstructor


haveAuthToken : AuthModel {} -> Bool
haveAuthToken model =
    isJust model.token


isLoggedIn : AuthModel {} -> Bool
isLoggedIn model =
    isJust model.roles


sendAuthEmail : String -> Cmd FluxMsg
sendAuthEmail email =
    API.apiReqAuthEmail email OnSentAuthEmail


getToken : String -> Cmd FluxMsg
getToken tempToken =
    API.tempTokenToAuthToken tempToken OnAuthTokenResp


getRoles : Maybe String -> Cmd FluxMsg
getRoles mToken =
    case mToken of
        Just token ->
            API.getRoles token OnGetRolesResp

        Nothing ->
            Cmd.none
