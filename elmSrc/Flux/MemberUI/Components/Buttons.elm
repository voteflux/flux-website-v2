module Flux.MemberUI.Components.Buttons exposing (..)

import DefaultDict
import Flux.MemberUI.Models exposing (Model)
import Flux.MemberUI.Msgs exposing (Msg(..))
import Html exposing (Attribute, Html, a, div, h1, span, text)
import Html.Attributes exposing (class, href)
import Html.Events exposing (keyCode, on, onClick)
import Json.Decode as Decode
import Material.Button as MButton
import Material.Color as Color
import Material.Options as Opts


btn : Int -> Model -> Msg -> List (Html Msg) -> Html Msg
btn id model msg elems =
    let
        disabled =
            DefaultDict.get id model.disabled

        extraProps =
            if disabled then
                [ MButton.disabled ]
            else
                []
    in
    MButton.render Mdl
        [ id ]
        model.mdl
        ([ MButton.ripple
         , MButton.accent
         , MButton.raised
         , Opts.onClick msg
         , Color.text Color.white
         ]
            ++ extraProps
        )
        elems
