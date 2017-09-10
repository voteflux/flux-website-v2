module DonationLog.Types exposing (..)


type alias Donation =
    { ts : Int
    , amount : String
    , branch : String
    }


type alias DonationResp =
    { donations : List Donation
    }
