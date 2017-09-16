module Flux.MemberUI.Models exposing (..)

import Flux.Models exposing (AuthModel, FModel)
import Navigation exposing (Location)


type alias Model =
    { user : Maybe User
    , flux : FModel {}
    , errors : List ( String, Bool )
    , location : Location
    , page : Page
    }


type alias User =
    { s : String
    , email : String
    }


type Page
    = PageNotFound
    | Home
    | Admin
    | MembershipForms
    | MembershipDetails
