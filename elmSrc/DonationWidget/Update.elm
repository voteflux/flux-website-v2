module DonationWidget.Update exposing (..)

import Dict
import DonationWidget.Models exposing (Model)
import DonationWidget.Msgs exposing (Msg(..))
import Random


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        -- log out any updates to the console
        debugTemp =
            Debug.log (toString msg) ""
    in
    case msg of
        OnLocationChange loc ->
            ( model, Cmd.none )

        SetPaymentIdInit i ->
            ( { model | paymentId = i }, Cmd.none )

        UpdateInput k v ->
            ( { model | input = Dict.insert k v model.input }, Cmd.none )

        SetJuri j ->
            ( { model | jurisdiction = j }, Cmd.none )

        QLDCheckbox ->
            ( { model | qldCheckbox = not model.qldCheckbox }, Cmd.none )


randomCmd : Cmd Msg
randomCmd =
    Random.generate SetPaymentIdInit (Random.int (10 ^ 12) (10 ^ 14))
