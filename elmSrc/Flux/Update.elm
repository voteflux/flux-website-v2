module Flux.Update exposing (..)

import Flux.Models exposing (AuthModel, FModel)
import Flux.Msgs exposing (FluxMsg(..))


updateAuth : FluxMsg -> FModel a -> ( FModel a, Cmd FluxMsg )
updateAuth msg model =
    case msg of
        UpdateAuthenticated ms ->
            ( { model | auth = ms }, Cmd.none )
