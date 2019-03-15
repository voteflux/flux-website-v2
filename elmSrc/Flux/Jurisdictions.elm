module Flux.Jurisdictions exposing (..)

import List exposing (filter, head)
import Maybe.Extra exposing ((?))


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



-- [TS] I don't think there is anyway to iterate over Union Types
-- See https://stackoverflow.com/questions/38132338/is-it-possible-to-iterate-over-union-type-in-elm
-- And https://groups.google.com/forum/#!topic/elm-discuss/lwBoQC8X5QI


ausJuris : List ( Jurisdiction, String, String )
ausJuris =
    [ ( AUS, "/AUS", "Flux Australia" )
    , ( NSW, "/AUS/NSW", "Flux NSW" )
    , ( VIC, "/AUS/VIC", "Flux VIC" )
    -- comment out QLD for the moment while we figure out disclosure stuff
    --, ( QLD, "/AUS/QLD", "Flux QLD" )
    , ( TAS, "/AUS/TAS", "Flux TAS" )
    , ( ACT, "/AUS/ACT", "Flux ACT" )
    , ( NT, "/AUS/NT", "Flux NT" )
    , ( SA, "/AUS/SA", "Flux SA" )
    , ( WA, "/AUS/WA", "Flux WA" )
    ]


mJuriTuple juri =
    head <| filter (\( t, s, n ) -> t == juri) ausJuris


mJuriTupleFromStr str =
    head <| filter (\( t, s, n ) -> s == str) ausJuris


toString : Jurisdiction -> String
toString juri =
    let
        ( t, s, n ) =
            mJuriTuple juri ? ( AUS, "Not Found", "Not Found" )
    in
    s


toName : Jurisdiction -> String
toName juri =
    let
        ( t, s, n ) =
            mJuriTuple juri ? ( AUS, "Not Found", "Not Found" )
    in
    n


fromString : String -> Jurisdiction
fromString str =
    let
        ( t, s, n ) =
            mJuriTupleFromStr str ? ( AUS, "Not Found", "Not Found" )
    in
    t
