module Flux.Jurisdictions exposing (..)

-- Usually I'd implement Jurisdiction as a string; but this serves to
-- make our code cleaner, typecheck jurisdictions, and demonstrate that
-- this is an option at all.


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


toName : Jurisdiction -> String
toName juri =
    case juri of
        AUS ->
            "Flux Australia"

        NSW ->
            "Flux NSW"

        VIC ->
            "Flux VIC"

        QLD ->
            "Flux QLD"

        TAS ->
            "Flux TAS"

        ACT ->
            "Flux ACT"

        NT ->
            "Flux NT"

        SA ->
            "Flux SA"

        WA ->
            "Flux WA"
