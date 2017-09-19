module Flux.MemberUI.Views.Root exposing (..)

import Flux.Auth exposing (userIsLoggedIn)
import Flux.MemberUI.Components.Buttons as Btns exposing (btn)
import Flux.MemberUI.Components.Headings exposing (heading)
import Flux.MemberUI.Models exposing (Model, Page(..))
import Flux.MemberUI.Msgs exposing (Msg(..))
import Flux.MemberUI.Views.Generic exposing (notFoundView)
import Helpers.Msgs exposing (HelperMsg(NewUrl))
import Html exposing (Html, div, h1, h2, img, li, span, text, ul)
import Html.Attributes exposing (class, id, src, style, width)
import Html.Events exposing (onClick)
import List exposing (length, map)
import Material.Button as Button
import Material.Color as Color exposing (Hue(DeepOrange, DeepPurple))
import Material.Layout as Layout
import Material.Options as Options exposing (css)
import Material.Scheme
import Maybe.Extra exposing ((?), isJust)
import Navigation exposing (newUrl)


mdlRootView : Model -> Html Msg
mdlRootView model =
    let
        a =
            1
    in
    Material.Scheme.topWithScheme DeepPurple DeepOrange <|
        Layout.render Mdl
            model.mdl
            [ Layout.fixedHeader
            , Layout.onSelectTab SelectTab
            , Layout.selectedTab model.selectedTab
            ]
            { header = [ branding ]
            , drawer = []
            , tabs =
                ( [ text "Your Details"
                  , text "Volunteer"
                  , text "Admin"
                  ]
                , [ Color.background (Color.color Color.DeepPurple Color.S400) ]
                )
            , main = [ viewBody model ]
            }


viewBody : Model -> Html Msg
viewBody model =
    let
        isAuthed =
            True

        whenAuthed =
            case model.selectedTab of
                0 ->
                    div []
                        [ h1 "Test heading thing -- just demo content" ]

                _ ->
                    notFoundView model

        whenNotAuthed =
            text "pls login"
    in
    if isAuthed then
        whenAuthed
    else
        whenNotAuthed


rootViewOld : Model -> Html Msg
rootViewOld model =
    let
        ( title, view ) =
            case model.page of
                PageNotFound ->
                    ( "Not Found :(", notFoundView model )

                Home ->
                    ( "Dashboard", homeViewOld model )

                MembershipForms ->
                    ( "Membership Forms", div [] [] )

                MembershipDetails ->
                    ( "Your Details", div [] [] )

                Admin ->
                    ( "Admin Panel", div [] [] )
    in
    div []
        [ navBarOld model
        , div [ class "pa3" ]
            [ heading "" 2 title
            , view
            ]
        ]


homeViewOld : Model -> Html Msg
homeViewOld model =
    let
        authenticatedPrelim =
            isJust model.flux.auth

        authenticatingView =
            div [ class "w-100 h-100" ] [ h2 [ class "center v-mid" ] [ text "Verifying Login Details..." ] ]

        homeView =
            div [] [ text <| model.flux.auth ? "" ]
    in
    if authenticatedPrelim then
        div [] [ homeView ]
    else
        div [] [ text "You need to auth!" ]


branding : Html Msg
branding =
    div []
        [ img [ src "/img/flux-mark.svg", class "v-mid dib ma3 w2-5" ] []
        , img [ src "/img/flux-text-logo-white.svg", class "v-mid dib pr3 w3" ] []
        ]


navBarOld : Model -> Html Msg
navBarOld model =
    let
        navbarTabLabel ( label, page ) =
            let
                extraCs =
                    if page == model.page then
                        "bb b--accent"
                    else
                        ""
            in
            li
                [ class <| "dib pa3 v-mid pointer dim " ++ extraCs
                , onClick <| SetPage page
                ]
                [ text label ]

        navbarItems =
            [ ( "Dashboard", Home ), ( "Admin", Admin ) ]

        rightButton =
            if userIsLoggedIn model.flux then
                btn "Log out" <| Btns.PriLink "#"
            else
                span [] [ text "Log In" ]
    in
    div [ class "w-100 ph3 pv3 bg-white-90 black cf dt bb b--accent", id "navbar" ]
        [ div [ class "dtc cf pa2 tl mh1 v-mid" ] [ branding ]
        , div [ class "fr tr" ]
            [ ul [ class "dib pr3" ] <| map navbarTabLabel navbarItems
            , rightButton
            ]
        ]
