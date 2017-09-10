module DonationLog.Model exposing (..)

import DonationLog.Types exposing (Donation)


type alias Model =
    { donationLog : List Donation
    }
