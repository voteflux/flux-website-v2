module DonationLog.Main exposing (..)

import DonationLog.Cmds exposing (getDonations)
import DonationLog.Const exposing (pageLength)
import DonationLog.Model exposing (Model)
import DonationLog.Msgs exposing (Msg(..))
import DonationLog.View exposing (view)
import Html exposing (Html, div, h1, table, text, th, tr)
import RemoteData
import List exposing (length)


init : ( Model, Cmd Msg )
init =
    ( { donationLog = [], err = Nothing, currPage = 0, totalPages = 0 }, getDonations )


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
                    let
                        totalPages = (length newLog.donations // pageLength) + 1
                    in
                    ( { model | donationLog = newLog.donations, currPage = 1, totalPages = totalPages }, Cmd.none )

                RemoteData.Failure _ ->
                    ( { model | err = Just "Unable to load donation log :(" }, Cmd.none )

                _ -> ( model, Cmd.none )

        SetPage newPage ->
            ( { model | currPage = newPage }, Cmd.none )
