module Flux.MemberUI.Models exposing (..)

import DefaultDict exposing (DefaultDict)
import Dict exposing (Dict)
import Flux.Models exposing (AuthModel, FModel, initFluxModel)
import Material
import Material.Snackbar as Snack
import Navigation exposing (Location)


type alias Model =
    { user : Maybe User
    , flux : FModel {}
    , errors : List ( String, Bool )
    , location : Location
    , page : Page
    , mdl : Material.Model
    , selectedTab : Int
    , inputs : Dict Int String
    , disabled : DefaultDict Int Bool
    , snack : Snack.Model Int
    }


type alias User =
    { s : String
    , email : String
    }


type Page
    = PageNotFound
    | Home
    | Admin AdminPage
    | Membership MbrPage
    | AuthLogin (Maybe String)


type MbrPage
    = MDetails
    | MVolunteer
    | MForms


type AdminPage
    = AMain
    | ASearchMbrs
    | APartyMatters
