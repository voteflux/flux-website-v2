module DonationWidget.Views.Utils exposing (..)

import DonationWidget.Msgs exposing (Msg)
import Html exposing (Html, span, text)
import Html.Attributes exposing (class)
import Maybe.Extra exposing ((?))


spanText : String -> Html Msg
spanText txt =
    span [ class "p2" ] [ text txt ]


fmtFloat : Float -> String
fmtFloat f =
    let
        fStr =
            if isNaN f then
                "0.0"
            else
                toString f

        hasDecimal =
            String.contains "." fStr

        position =
            (List.head <| String.indexes "." fStr) ? String.length fStr
    in
    String.slice 0 (position + 4) fStr
