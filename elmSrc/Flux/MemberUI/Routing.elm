module Flux.MemberUI.Routing exposing (..)

import Flux.MemberUI.Models exposing (AdminPage(..), MbrPage(..), Page(..))
import Maybe.Extra exposing ((?))
import Navigation exposing (Location)
import UrlParser exposing ((<?>), Parser, QueryParser, map, oneOf, parseHash, s, stringParam, top)


parseRoute : Location -> Page
parseRoute loc =
    case parseHash matchers loc of
        Just page ->
            page

        Nothing ->
            case parseHash queryMatchers loc of
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
    oneOf <| List.map procPageEntry pageToParser ++ [ map AuthLogin <| s "login" <?> stringParam "s" ]


queryMatchers : Parser (Page -> a) a
queryMatchers =
    oneOf <| [ map AuthLogin <| s "login" <?> stringParam "s" ]


joinHashList : List String -> String
joinHashList hashFrags =
    String.join "/" hashFrags


hashFragsToParser : List String -> List (QueryParser (Maybe String -> a) a) -> Parser a a
hashFragsToParser hashFrags queryParams =
    let
        start =
            s <| joinHashList hashFrags
    in
    start


pageToHashFrag : List ( Page, List String, List (QueryParser (Maybe String -> a) a) )
pageToHashFrag =
    [ ( Home, [], [] )
    , ( Admin AMain, [ "admin" ], [] )
    , ( Membership MDetails, [ "member", "details" ], [] )
    , ( Membership MForms, [ "member", "forms" ], [] )
    , ( Membership MVolunteer, [ "member", "volunteer" ], [] )
    ]


pageToParser : List ( Page, Parser a a )
pageToParser =
    let
        modList ( page, hashFrags, queryParams ) =
            ( page, hashFragsToParser hashFrags queryParams )
    in
    List.map modList pageToHashFrag


pageToHash : Page -> String
pageToHash page =
    let
        checkPage ( p, _, _ ) =
            page == p

        ( foundPage, hashFrags, _ ) =
            (List.head <| List.filter checkPage pageToHashFrag) ? ( PageNotFound, [ "notFound" ], [] )
    in
    if foundPage == Home then
        ""
    else
        "#/" ++ joinHashList hashFrags
