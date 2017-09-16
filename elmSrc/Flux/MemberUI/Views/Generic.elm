module Flux.MemberUI.Views.Generic exposing (..)

import Flux.MemberUI.Models exposing (Model)
import Flux.MemberUI.Msgs exposing (Msg)
import Html exposing (Html, div, p, text)


notFoundView : Model -> Html Msg
notFoundView model =
    div [] [ p [] [ text "We can't find the page you're looking for." ] ]
