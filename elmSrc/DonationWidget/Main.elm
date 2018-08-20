module DonationWidget.Main exposing (..)

--import Components.PayPalBtn exposing (paypalBtn)

import Dict
import DonationWidget.Models exposing (Model)
import DonationWidget.Msgs exposing (Msg(OnLocationChange, SetPaymentIdInit))
import DonationWidget.Update exposing (randomCmd, update)
import DonationWidget.Views.BtnView exposing (btnView)
import Flux.Jurisdictions exposing (Jurisdiction(AUS))
import Html exposing (Html, div)
import Navigation exposing (Location)
import Random


init : Location -> ( Model, Cmd Msg )
init loc =
    ( { jurisdiction = AUS, paymentId = 0, input = Dict.empty }, randomCmd )


view : Model -> Html Msg
view model =
    btnView model


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        []


main : Program Never Model Msg
main =
    Navigation.program OnLocationChange
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
