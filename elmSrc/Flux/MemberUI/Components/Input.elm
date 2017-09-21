module Flux.MemberUI.Components.Input exposing (..)

import Dict
import Flux.MemberUI.Models exposing (Model)
import Flux.MemberUI.Msgs exposing (Msg(..))
import Html exposing (Html)
import Html.Events exposing (keyCode)
import Json.Decode as JD
import Material.Color as Color
import Material.Options as Opts
import Material.Textfield as Textfield
import Maybe.Extra exposing ((?))


onEnter : Msg -> Opts.Property a Msg
onEnter msg =
    Opts.on "keydown" (JD.andThen (isEnter msg) keyCode)


isEnter : Msg -> number -> JD.Decoder Msg
isEnter msg code =
    if code == 13 then
        JD.succeed msg
    else
        JD.fail "not Enter"


textInput : Model -> Int -> String -> Msg -> Html Msg
textInput model i label enterMsg =
    genTextInput_ Textfield.text_ model i label enterMsg


emailInput : Model -> Int -> String -> Msg -> Html Msg
emailInput model i label enterMsg =
    genTextInput_ Textfield.email model i label enterMsg


genTextInput_ : Textfield.Property Msg -> Model -> Int -> String -> Msg -> Html Msg
genTextInput_ type_ model i label enterMsg =
    Textfield.render Mdl
        [ i ]
        model.mdl
        [ Textfield.label label
        , Textfield.floatingLabel
        , Opts.onInput (UpdateField i)
        , onEnter enterMsg
        , Textfield.value <| Dict.get i model.inputs ? ""
        , type_
        ]
        []
