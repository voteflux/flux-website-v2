module Flux.Subs exposing (..)

import Flux.Auth exposing (decodeIsAuthenticated, isAuthenticated)
import Flux.MemberUI.Msgs exposing (Msg(FMsg, HMsg))
import Flux.Msgs exposing (FluxMsg(..))
import Helpers.Msgs exposing (HelperMsg)
import Result exposing (toMaybe)


isAuthenticatedSub : Sub Msg
isAuthenticatedSub =
    Sub.map HMsg <| isAuthenticated (decodeIsAuthenticated <| FMsg << UpdateAuthenticated << toMaybe)
