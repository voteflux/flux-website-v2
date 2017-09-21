module Flux.Models exposing (..)

import DefaultDict exposing (DefaultDict)
import Dict exposing (Dict)


type alias FModel a =
    AuthModel a


type alias AuthModel a =
    { a
        | token : Maybe String
        , roles : Maybe (List String)
        , checkEmail : Bool
        , errors : List String
    }


initAuthModel : AuthModel {}
initAuthModel =
    { token = Nothing
    , roles = Nothing
    , checkEmail = False
    , errors = []
    }


initFluxModel : FModel {}
initFluxModel =
    initAuthModel
