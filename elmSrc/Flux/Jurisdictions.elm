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

-- [TS] I don't think there is anyway to iteratte over Union Types
-- See https://stackoverflow.com/questions/38132338/is-it-possible-to-iterate-over-union-type-in-elm
-- And https://groups.google.com/forum/#!topic/elm-discuss/lwBoQC8X5QI
listJurisdictions : List { state : Jurisdiction }
listJurisdictions =
    [ { state = AUS }
    , { state = NSW }
    , { state = VIC }
    , { state = QLD }
    , { state = TAS }
    , { state = ACT }
    , { state = NT }
    , { state = SA }
    , { state = WA } ]


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
