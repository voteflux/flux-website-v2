module Flux.MemberUI.Main exposing (..)

import DefaultDict
import Dict
import Flux.Auth as Auth
import Flux.MemberUI.Models exposing (Model, Page(AuthLogin, Home))
import Flux.MemberUI.Msgs exposing (Msg(..))
import Flux.MemberUI.Routing exposing (parseRoute)
import Flux.MemberUI.Update exposing (update)
import Flux.MemberUI.Views.Root exposing (mdlRootView)
import Flux.Models exposing (initFluxModel)
import Flux.Msgs exposing (FluxMsg(UpdateAuthenticated))
import Flux.Subs exposing (isAuthenticatedSub)
import Flux.Update
import Helpers.Location exposing (fixLocationQuery)
import Helpers.Msgs exposing (HelperMsg(OnErrLog, OnLocationChange, OnPortResp))
import Html exposing (Html, div, text)
import Material
import Material.Layout as Layout
import Material.Snackbar as Snack
import Maybe.Extra exposing ((?))
import Navigation exposing (Location)


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Material.subscriptions Mdl model
        , isAuthenticatedSub
        ]


init : Location -> ( Model, Cmd Msg )
init loc =
    let
        loc_ =
            fixLocationQuery loc

        startPage =
            parseRoute loc_

        ( beginAuth, magicToken ) =
            case startPage of
                AuthLogin (Just s) ->
                    ( True, s )

                _ ->
                    ( False, "" )

        extraCmds =
            if beginAuth then
                [ Cmd.map FMsg <| Auth.getToken magicToken ]
            else
                []
    in
    ( { flux = initFluxModel
      , user = Nothing
      , errors = []
      , location = loc_
      , page = startPage
      , mdl = Material.model
      , selectedTab = 0
      , inputs = Dict.empty
      , disabled = DefaultDict.empty False
      , snack = Snack.model
      }
    , Cmd.batch <| [ Material.init Mdl ] ++ extraCmds
    )


main : Program Never Model Msg
main =
    Navigation.program (HMsg << OnLocationChange)
        { init = init
        , view = mdlRootView
        , update = update
        , subscriptions = subscriptions
        }
