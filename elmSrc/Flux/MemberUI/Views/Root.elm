module Flux.MemberUI.Views.Root exposing (..)

import Flux.Auth exposing (userIsLoggedIn)
import Flux.MemberUI.Components.Buttons as Btns exposing (btn)
import Flux.MemberUI.Components.Headings exposing (heading)
import Flux.MemberUI.Models exposing (Model, Page(..))
import Flux.MemberUI.Msgs exposing (Msg(..))
import Flux.MemberUI.Views.Generic exposing (notFoundView)
import Helpers.Msgs exposing (HelperMsg(NewUrl))
import Html exposing (Html, div, h2, img, li, span, text, ul)
import Html.Attributes exposing (class, id, src, width)
import Html.Events exposing (onClick)
import List exposing (length, map)
import Maybe.Extra exposing ((?), isJust)
import Navigation exposing (newUrl)


rootView : Model -> Html Msg
rootView model =
    let
        ( title, view ) =
            case model.page of
                PageNotFound ->
                    ( "Not Found :(", notFoundView model )

                Home ->
                    ( "Dashboard", homeView model )

                MembershipForms ->
                    ( "Membership Forms", div [] [] )

                MembershipDetails ->
                    ( "Your Details", div [] [] )

                Admin ->
                    ( "Admin Panel", div [] [] )
    in
    div []
        [ navBar model
        , div [ class "pa3d" ]
            [ heading "" 2 title
            , view
            ]
        ]


homeView : Model -> Html Msg
homeView model =
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


navBar : Model -> Html Msg
navBar model =
    let
        branding =
            div []
                [ img [ src "/img/flux-mark.svg", class "v-mid dib pr3 w2" ] []
                , img [ src "/img/flux-text-logo.svg", class "v-mid dib pr3 w3" ] []
                , heading "dib" 3 "Members"
                ]

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
