module Flux.MemberUI.Components.MdText exposing (..)

import Html exposing (Html, div, text)
import Material.Options as Opts
import Material.Typography as Typo


heading : String -> Html msg
heading txt =
    Opts.styled div [ Typo.display2 ] [ text txt ]


p : List (Opts.Property c msg) -> String -> Html msg
p attrs txt =
    let
        attrs_ =
            [ Typo.body1 ] ++ attrs
    in
    Opts.styled Html.p attrs_ [ text txt ]
