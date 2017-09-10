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
        mkRow { ts, amount } =
            tr []
                [ td [] [ text <| toFormattedString "EEEE, MMMM d, y 'at' h:mm a" <| Date.fromTime (toFloat ts * second) ]
                , td [] [ text <| (++) "$" amount ]
                ]
    in
    div []
        [ table [] <|
            [ tr []
                [ th [] [ text "Date" ]
                , th [] [ text "Amount" ]
                ]
            ]
                ++ map mkRow model.donationLog
        ]
