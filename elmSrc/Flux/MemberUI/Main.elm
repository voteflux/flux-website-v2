module Flux.MemberUI.Main exposing (..)

import Flux.MemberUI.Models exposing (Model, Page(Home))
import Flux.MemberUI.Msgs exposing (Msg(..))
import Flux.MemberUI.Update exposing (update)
import Flux.MemberUI.Views.Root exposing (mdlRootView)
import Flux.Models exposing (initFluxModel)
import Flux.Msgs exposing (FluxMsg(UpdateAuthenticated))
import Flux.Subs exposing (isAuthenticatedSub)
import Flux.Update
import Helpers.Msgs exposing (HelperMsg(OnErrLog, OnLocationChange, OnPortResp))
import Html exposing (Html, div, text)
import Material
import Material.Layout as Layout
import Maybe.Extra exposing ((?))
import Navigation exposing (Location)


init : Location -> ( Model, Cmd Msg )
init loc =
    ( { flux = initFluxModel
      , user = Nothing
      , errors = []
      , location = loc
      , page = Home
      , mdl = Material.model
      , selectedTab = 0
      }
    , Cmd.none
    )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ isAuthenticatedSub, Layout.subs Mdl model.mdl ]


main : Program Never Model Msg
main =
    Navigation.program (HMsg << OnLocationChange)
        { init = init
        , view = mdlRootView
        , update = update
        , subscriptions = subscriptions
        }
