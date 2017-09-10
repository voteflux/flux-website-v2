module DonationWidget.Components.PayPalBtn exposing (..)

import Dict
import DonationWidget.Models exposing (Model)
import DonationWidget.Msgs exposing (Msg(UpdateInput))
import DonationWidget.Views.Utils exposing (fmtFloat, spanText)
import Flux.Jurisdictions as Juris
import Html exposing (Html, a, br, div, form, h1, h2, h3, h4, img, input, label, p, pre, span, text)
import Html.Attributes exposing (action, alt, class, height, id, method, name, src, step, type_, value, width)
import Html.Events exposing (onClick, onInput)
import Maybe.Extra exposing ((?))


paypalButtonForm : Model -> Html Msg
paypalButtonForm model =
    form [ class "", action "https://www.paypal.com/cgi-bin/webscr", method "post" ]
        [ input [ type_ "hidden", name "cmd", value "_s-xclick" ] []
        , input [ type_ "hidden", name "hosted_button_id", value "TZXYFG3Q3NJ4U" ] []
        , input [ type_ "image", src "/img/vendor/btn_donate_LG.gif", name "submit", alt "PayPal – The safer, easier way to pay online!" ] []
        , input [ type_ "hidden", name "on0", value "Branch" ] []
        , input [ type_ "hidden", name "os0", value <| Juris.toString model.jurisdiction ] []
        , input [ type_ "hidden", name "on1", value "Donation Session" ] []
        , input [ type_ "hidden", name "os1", value <| toString model.paymentId ] []
        ]


debugInfo : Model -> Html Msg
debugInfo model =
    div [ class "p2 border" ]
        [ h4 [] [ text "debug" ]
        , p []
            [ text <| Juris.toString model.jurisdiction
            , text " - "
            , text <| toString model.paymentId
            ]
        ]


paypalBtn : Model -> Html Msg
paypalBtn model =
    div [ id "paypal-button" ]
        [ h1 [] [ text "The easiest way to donate is via PayPal" ]
        , div [ class "" ]
            [ h3 [ class "inline-block" ] [ text "Choose a branch: " ]
            , p [ class "inline-block px1" ] [ text "Flux Australia" ]

            {- , debugInfo model -}
            ]
        , paypalButtonForm model
        , paypalCutCalc model
        , p [ class "small" ] [ span [ class "bold" ] [ text "Note: " ], text "currently you're only able to donate to Flux Australia, but we'll have donations to individual branches soon." ]
        ]


paypalCutCalc : Model -> Html Msg
paypalCutCalc model =
    let
        dKey =
            "paypal-cut-calc-input"

        dShowKey =
            "paypal-cut-calc-show"

        prevInput =
            -- `?` : Maybe a -> a -> a
            -- turns a Maybe Val into a Val with a default
            Dict.get dKey model.input ? ""

        ppTotal =
            Result.withDefault 0.0 <| String.toFloat prevInput

        -- 2.9% + 30c per tx
        ppCut =
            if ppTotal == 0.0 then
                0.0
            else
                ppTotal * 0.029 + 0.3

        ppCutProp =
            fmtFloat <| ppCut / ppTotal * 100.0

        toggleShowState =
            Dict.get dShowKey model.input ? "0"

        toggleShow =
            toString <|
                (Result.withDefault 1 <| String.toFloat toggleShowState)
                    * -1
                    + 1

        toggleShowBool =
            toggleShowState == "1"

        toggleShowMsg =
            UpdateInput dShowKey toggleShow

        toggleShowCls =
            class <|
                if toggleShowBool then
                    ""
                else
                    "hide"

        toggleButtonTxt =
            if toggleShowBool then
                "+"
            else
                "-"

        toggleBtn =
            a
                [ onClick toggleShowMsg
                , class "bold small pointer"
                ]
                [ text "(click)" ]
    in
    div [ class "" ]
        [ h3 []
            [ text "Interested in the fees PayPal takes? "
            , toggleBtn
            ]
        , div [ toggleShowCls ]
            [ label [] [ text "Donation Amount ($): " ]
            , input
                [ type_ "number"
                , step "0.01"
                , class "block field py0"
                , value prevInput
                , onInput <| UpdateInput dKey
                ]
                []
            , spanText <| "Paypal's Cut: $" ++ fmtFloat ppCut ++ " (" ++ ppCutProp ++ "%)"
            ]
        ]
