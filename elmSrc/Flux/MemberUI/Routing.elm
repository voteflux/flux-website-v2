module Flux.MemberUI.Routing exposing (..)

import Flux.MemberUI.Models exposing (Page(..))
import Navigation exposing (Location)
import UrlParser exposing (Parser, map, oneOf, parseHash, s, top)


parseRoute : Location -> Page
parseRoute loc =
    case parseHash matchers loc of
        Just page ->
            page

        Nothing ->
            PageNotFound


matchers : Parser (Page -> a) a
matchers =
    let
        procPageEntry ( page, path ) =
            map page path
    in
    oneOf <| List.map procPageEntry pageMap


pageMap : List ( Page, Parser a a )
pageMap =
    [ ( Home, top )
    , ( Admin, s "admin" )
    ]
