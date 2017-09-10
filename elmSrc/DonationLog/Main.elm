module DonationLog.Main exposing (..)

import DonationLog.Cmds exposing (getDonations)
import DonationLog.Model exposing (Model)
import DonationLog.Msgs exposing (Msg(..))
import DonationLog.View exposing (view)
import Html exposing (Html, div, h1, table, text, th, tr)
import RemoteData


init : ( Model, Cmd Msg )
init =
    ( { donationLog = [] }, getDonations )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        []


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UpdateDonationLog newLog ->
            case newLog of
                RemoteData.Success newLog ->
                    ( { model | donationLog = newLog.donations }, Cmd.none )

                _ ->
                    ( model, Cmd.none )
