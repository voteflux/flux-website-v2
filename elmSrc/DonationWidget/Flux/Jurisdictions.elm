module DonationWidget.Flux.Jurisdictions exposing (..)


type Jurisdiction
    = AUS
    | NSW
    | VIC
    | QLD
    | TAS
    | ACT
    | NT
    | SA
    | WA


toString : Jurisdiction -> String
toString juri =
    case juri of
        AUS ->
            "/AUS"

        NSW ->
            "/AUS/NSW"

        VIC ->
            "/AUS/VIC"

        QLD ->
            "/AUS/QLD"

        TAS ->
            "/AUS/TAS"

        ACT ->
            "/AUS/ACT"

        NT ->
            "/AUS/NT"

        SA ->
            "/AUS/SA"

        WA ->
            "/AUS/WA"
