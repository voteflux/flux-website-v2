module DonationWidget.Main exposing (..)

--import Components.PayPalBtn exposing (paypalBtn)

import DonationWidget.Flux.Jurisdictions exposing (Jurisdiction(AUS))
import DonationWidget.Models exposing (Model)
import DonationWidget.Msgs exposing (Msg(OnLocationChange, SetPaymentIdInit))
import DonationWidget.Views.BtnView exposing (btnView)
import Html exposing (Html, div)
import Navigation exposing (Location)
import Random


init : Location -> ( Model, Cmd Msg )
init loc =
    ( { jurisdiction = AUS, paymentId = 0 }, randomCmd )


view : Model -> Html Msg
view model =
    btnView model



--    paypalBtn model


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        OnLocationChange loc ->
            ( model, Cmd.none )

        SetPaymentIdInit i ->
            ( { model | paymentId = i }, Cmd.none )


randomCmd : Cmd Msg
randomCmd =
    Random.generate SetPaymentIdInit (Random.int (10 ^ 12) (10 ^ 14))


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch []


main : Program Never Model Msg
main =
    Navigation.program OnLocationChange
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
