port module Flux.Auth exposing (..)

import Flux.Models exposing (AuthModel)
import Flux.Msgs exposing (FluxMsg)
import Helpers.Json exposing (decodePortResp)
import Helpers.Msgs exposing (HelperMsg)
import Json.Decode as Decode
import Json.Decode.Pipeline exposing (decode, required)
import Maybe.Extra exposing (isJust)


port isAuthenticated : (Decode.Value -> msg) -> Sub msg


decodeIsAuthenticated : (Result String String -> msg) -> Decode.Value -> HelperMsg msg
decodeIsAuthenticated msgConstructor val =
    decodePortResp Decode.string val msgConstructor


userIsLoggedIn : AuthModel {} -> Bool
userIsLoggedIn model =
    isJust model.auth
