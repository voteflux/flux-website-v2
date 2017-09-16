module Flux.MemberUI.Components.Buttons exposing (..)

import Flux.MemberUI.Msgs exposing (Msg)
import Html exposing (Attribute, Html, a, div, h1, span, text)
import Html.Attributes exposing (class, href)
import Html.Events exposing (keyCode, on, onClick)
import Json.Decode as Decode


type BtnMod
    = PriLink String
    | PriAction Msg
    | SecLink String
    | SecAction Msg


onKeyDown : (Int -> msg) -> Attribute msg
onKeyDown tagger =
    on "keydown" (Decode.map tagger keyCode)


btn : String -> BtnMod -> Html Msg
btn label mod =
    let
        classes =
            "dim link ba br2 ph3 pv2 b--white dib ma1 "

        priClasses =
            classes ++ "bg-accent white"

        secClasses =
            classes ++ "bg-light-silver near-black"

        attrs =
            case mod of
                PriLink link ->
                    [ href link, class priClasses ]

                SecLink link ->
                    [ href link, class secClasses ]

                PriAction msg ->
                    [ onClick msg, class priClasses ]

                SecAction msg ->
                    [ onClick msg, class secClasses ]
    in
    a attrs [ span [ class "" ] [ text label ] ]
