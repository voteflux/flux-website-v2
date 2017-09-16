module Flux.Models exposing (..)


type alias FModel a =
    AuthModel a


type alias AuthModel r =
    { r | auth : Maybe String }


initFluxModel : FModel {}
initFluxModel =
    { auth = Nothing }
