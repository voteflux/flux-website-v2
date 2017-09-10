module DonationLog.Msgs exposing (..)

import DonationLog.Types exposing (Donation, DonationResp)
import RemoteData exposing (WebData)


type Msg
    = UpdateDonationLog (WebData DonationResp)
