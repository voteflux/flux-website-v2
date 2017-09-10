module DonationLog.View exposing (..)

import Date
import Date.Extra exposing (toFormattedString)
import DonationLog.Model exposing (Model)
import DonationLog.Msgs exposing (Msg)
import Html exposing (Html, div, table, td, text, th, tr)
import List exposing (map)
import Time exposing (second)


view : Model -> Html Msg
view model =
    let
        mkRow { ts, amount, branch } =
            tr []
                [ td [] [ text <| toFormattedString "EEEE, MMMM d, y 'at' h:mm a" <| Date.fromTime (toFloat ts * second) ]
                , td [] [ text <| (++) "$" amount ]
                , td [] [ text branch ]
                ]
    in
    div []
        [ table [] <|
            [ tr []
                [ th [] [ text "Date" ]
                , th [] [ text "Amount" ]
                , th [] [ text "Branch" ]
                ]
            ]
                ++ map mkRow model.donationLog
        ]
