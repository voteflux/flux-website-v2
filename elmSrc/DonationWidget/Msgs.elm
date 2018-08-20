module DonationWidget.Msgs exposing (..)

import Flux.Jurisdictions exposing (Jurisdiction)
import Navigation exposing (Location)


type Msg
    = OnLocationChange Location
    | SetPaymentIdInit Int
    | UpdateInput String String
    | SetJuri Jurisdiction
