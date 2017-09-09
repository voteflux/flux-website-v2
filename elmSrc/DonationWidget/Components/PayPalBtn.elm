module DonationWidget.Components.PayPalBtn exposing (..)

import DonationWidget.Flux.Jurisdictions as Juris
import DonationWidget.Models exposing (Model)
import DonationWidget.Msgs exposing (Msg)
import Html exposing (Html, div, form, h1, h2, h3, h4, img, input, p, pre, text)
import Html.Attributes exposing (action, alt, class, height, id, method, name, src, type_, value, width)


paypalBtn : Model -> Html Msg
paypalBtn model =
    div [ id "paypal-button" ]
        [ h2 [] [ text "The easiest way to donate is via PayPal" ]
        , div [ class "" ]
            [ h3 [ class "inline-block" ] [ text "Choose a branch: " ]
            , p [ class "inline-block" ] [ text "Flux Australia" ]
            , div [ class "p2 border" ]
                [ h4 [] [ text "debug" ]
                , p []
                    [ text <| Juris.toString model.jurisdiction
                    , text " - "
                    , text <| toString model.paymentId
                    ]
                ]
            ]
        , form [ class "", action "https://www.paypal.com/cgi-bin/webscr", method "post" ]
            [ input [ type_ "hidden", name "cmd", value "_s-xclick" ] []
            , input [ type_ "hidden", name "hosted_button_id", value "TZXYFG3Q3NJ4U" ] []
            , input [ type_ "image", src "https://www.paypalobjects.com/en_AU/i/btn/btn_donate_LG.gif", name "submit", alt "PayPal – The safer, easier way to pay online!" ] []
            , input [ type_ "hidden", name "on0", value "Branch" ] []
            , input [ type_ "hidden", name "os0", value <| Juris.toString model.jurisdiction ] []
            , input [ type_ "hidden", name "on1", value "Donation ID" ] []
            , input [ type_ "hidden", name "os1", value <| toString model.paymentId ] []
            ]
        ]
