module DonationWidget.Models exposing (..)

import Dict exposing (Dict)
import DonationWidget.Flux.Jurisdictions exposing (Jurisdiction)


type alias Model =
    { jurisdiction : Jurisdiction
    , paymentId : Int
    , input : Dict String String
    }
