module DonationWidget.Views.BtnView exposing (..)

import DonationWidget.Components.PayPalBtn exposing (paypalBtn)
import DonationWidget.Models exposing (Model)
import DonationWidget.Msgs exposing (Msg)
import Html exposing (Html, div)


btnView : Model -> Html Msg
btnView model =
    div [] [ paypalBtn model ]
