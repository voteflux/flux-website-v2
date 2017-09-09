module DonationWidget.Models exposing (..)

import DonationWidget.Flux.Jurisdictions exposing (Jurisdiction)


type alias Model =
    { jurisdiction : Jurisdiction
    , paymentId : Int
    }
