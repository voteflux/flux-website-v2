module DonationWidget.Msgs exposing (..)

import Navigation exposing (Location)


type Msg
    = OnLocationChange Location
    | SetPaymentIdInit Int
    | UpdateInput String String
