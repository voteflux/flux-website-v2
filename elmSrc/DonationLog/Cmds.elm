module DonationLog.Cmds exposing (..)

import DonationLog.Msgs as Msgs exposing (Msg)
import DonationLog.Types exposing (Donation, DonationResp)
import Http
import Json.Decode as Decode
import Json.Decode.Pipeline exposing (decode, required)
import RemoteData


getDonations : Cmd Msg
getDonations =
    let
        url =
            "https://api.voteflux.org/api/v1/anon_donation_log"
    in
    Http.get url donationsDecoder
        |> RemoteData.sendRequest
        |> Cmd.map Msgs.UpdateDonationLog


donationsDecoder : Decode.Decoder DonationResp
donationsDecoder =
    decode DonationResp
        |> required "donations" (Decode.list donationDecoder)


donationDecoder : Decode.Decoder Donation
donationDecoder =
    decode Donation
        |> required "ts" Decode.int
        |> required "amount" Decode.string
