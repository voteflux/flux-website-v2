module Flux.MemberUI.Components.Headings exposing (..)

import Flux.MemberUI.Msgs exposing (Msg)
import Html exposing (Html, div, text)
import Html.Attributes exposing (class)


heading : String -> Int -> String -> Html Msg
heading extraClass size content =
    let
        sizeClass =
            (++) "f" <| toString size

        otherClasses =
            " underline v-mid " ++ extraClass
    in
    div [ class <| sizeClass ++ otherClasses ] [ text content ]


pHeading : Int -> Int -> String -> Html Msg
pHeading padding size content =
    let
        genHdr hdr =
            div [ class <| "pv" ++ toString padding ] [ hdr ]
    in
    genHdr <| heading "" size content
