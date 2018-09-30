module DonationLog.View exposing (..)

import Date
import Date.Extra exposing (toFormattedString)
import DonationLog.Const exposing (pageLength)
import DonationLog.Model exposing (Model)
import DonationLog.Msgs exposing (Msg(..))
import Html exposing (Html, div, table, td, text, th, tr, button, span)
import Html.Attributes exposing (class, disabled)
import Html.Events exposing (onClick)
import List exposing (map, take, drop)
import Time exposing (second)


view : Model -> Html Msg
view model =
    let
        btn attrs els = button (attrs ++ [ class "btn btn-primary" ]) els
        mkRow { ts, amount, branch } =
            tr []
                [ td [] [ text <| toFormattedString "EEEE, MMMM d, y 'at' h:mm a" <| Date.fromTime (toFloat ts * second) ]
                , td [] [ text <| (++) "$" amount ]
                , td [] [ text branch ]
                ]
        enabled =
            {
                prev = disabled (model.currPage <= 1),
                next = disabled (model.currPage >= model.totalPages)
            }
        paginateBtns =
            div [ class "flex justify-around items-center" ]
                [ btn [ enabled.prev, onClick <| SetPage <| model.currPage - 1 ] [ text "Prev" ]
                , span [] [ text <| "Page " ++ toString model.currPage ++ " of " ++ toString model.totalPages ]
                , btn [ enabled.next, onClick <| SetPage <| model.currPage + 1 ] [ text "Next" ]
                ]
        toDrop = ( model.currPage - 1 ) * pageLength
        toTake = pageLength
    in
    div []
        [ paginateBtns
        , table [] <|
            [ tr []
                [ th [] [ text "Date" ]
                , th [] [ text "Amount" ]
                , th [] [ text "Branch" ]
                ]
            ]
                ++ map mkRow (take toTake <| drop toDrop <| model.donationLog)
        , paginateBtns
        ]
