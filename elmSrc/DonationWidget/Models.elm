module DonationWidget.Models exposing (..)

import Dict exposing (Dict)
import Flux.Jurisdictions exposing (Jurisdiction)


type alias Model =
    { jurisdiction : Jurisdiction
    , paymentId : Int
    , input : Dict String String
    , qldCheckbox : Bool
    }
