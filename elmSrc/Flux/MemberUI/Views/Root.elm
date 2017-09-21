module Flux.MemberUI.Views.Root exposing (..)

import Flux.Auth exposing (haveAuthToken)
import Flux.MemberUI.Components.Buttons as Btns exposing (btn)
import Flux.MemberUI.Components.Headings exposing (heading)
import Flux.MemberUI.Models exposing (AdminPage(..), MbrPage(..), Model, Page(..))
import Flux.MemberUI.Msgs exposing (Msg(..))
import Flux.MemberUI.Routing exposing (pageToHash)
import Flux.MemberUI.Views.AuthV exposing (getAuthOrView)
import Flux.MemberUI.Views.Generic exposing (notFoundView)
import Flux.MemberUI.Views.Params exposing (..)
import Helpers.Msgs exposing (HelperMsg(NewUrl))
import Html exposing (Html, div, h1, h2, img, li, span, text, ul)
import Html.Attributes exposing (class, id, src, style, width)
import Html.Events exposing (onClick)
import List exposing (length, map)
import Material.Button as Button
import Material.Color as Color exposing (Hue(DeepOrange, DeepPurple))
import Material.Layout as Layout
import Material.Options as Opts exposing (css)
import Material.Scheme
import Material.Snackbar as Snack
import Maybe.Extra exposing ((?), isJust)
import Navigation exposing (newUrl)


mdlRootView : Model -> Html Msg
mdlRootView model =
    let
        a =
            1
    in
    Material.Scheme.topWithScheme priColorH secColorH <|
        Layout.render Mdl
            model.mdl
            [ Layout.fixedHeader
            , Layout.fixedDrawer
            , Layout.onSelectTab SelectTab
            , Layout.selectedTab model.selectedTab
            ]
            { header = [ Layout.row [] [ Layout.title [] [ branding BrandLight ] ] ]
            , drawer = rootDrawer model
            , tabs = ( [], [] )
            , main = [ pageWrapView model <| getAuthOrView viewBody model ]
            }


pageWrapView : Model -> Html Msg -> Html Msg
pageWrapView model main =
    div []
        [ main
        , Snack.view model.snack |> Html.map Snack
        ]


navPages : List ( String, Page )
navPages =
    [ ( "Your Details", Membership MDetails )
    , ( "Your Forms", Membership MForms )
    , ( "Volunteer", Membership MVolunteer )
    , ( "Admin", Admin AMain )
    ]


rootDrawer : Model -> List (Html Msg)
rootDrawer model =
    let
        mkPageLink ( name, page ) =
            Layout.link [ Color.text priColorDark, Layout.href <| pageToHash page ] [ text name ]
    in
    [ Layout.title [ Color.background priColor, Opts.cs "h4-5" ] []
    , Layout.navigation [] <| List.map mkPageLink navPages
    ]


viewBody : Model -> Html Msg
viewBody model =
    let
        isAuthed =
            True

        whenAuthed =
            case model.selectedTab of
                0 ->
                    div []
                        [ h1 [] [ text "Test heading thing -- just demo content" ] ]

                _ ->
                    notFoundView model

        whenNotAuthed =
            text "pls login"
    in
    if isAuthed then
        whenAuthed
    else
        whenNotAuthed



--
--rootViewOld : Model -> Html Msg
--rootViewOld model =
--    let
--        ( title, view ) =
--            case model.page of
--                PageNotFound ->
--                    ( "Not Found :(", notFoundView model )
--
--                Home ->
--                    ( "Dashboard", homeViewOld model )
--
--                MembershipForms ->
--                    ( "Membership Forms", div [] [] )
--
--                MembershipDetails ->
--                    ( "Your Details", div [] [] )
--
--                Admin ->
--                    ( "Admin Panel", div [] [] )
--    in
--    div []
--        [ navBarOld model
--        , div [ class "pa3" ]
--            [ heading "" 2 title
--            , view
--            ]
--        ]
--
--homeViewOld : Model -> Html Msg
--homeViewOld model =
--    let
--        authenticatedPrelim =
--            haveAuthToken model.flux
--
--        authenticatingView =
--            div [ class "w-100 h-100" ] [ h2 [ class "center v-mid" ] [ text "Verifying Login Details..." ] ]
--
--        homeView =
--            div [] [ text <| model.flux.auth ? "" ]
--    in
--    if authenticatedPrelim then
--        div [] [ homeView ]
--    else
--        div [] [ text "You need to auth!" ]


type BrandColor
    = BrandDark
    | BrandLight


branding : BrandColor -> Html Msg
branding color =
    let
        txtLogoFilename =
            case color of
                BrandDark ->
                    "/img/flux-text-logo.svg"

                BrandLight ->
                    "/img/flux-text-logo-white.svg"
    in
    div []
        [ img [ src "/img/flux-mark.svg", class "v-mid dib pr3 w2" ] []
        , img [ src txtLogoFilename, class "v-mid dib pr3 w3" ] []
        ]



--
--navBarOld : Model -> Html Msg
--navBarOld model =
--    let
--        navbarTabLabel ( label, page ) =
--            let
--                extraCs =
--                    if page == model.page then
--                        "bb b--accent"
--                    else
--                        ""
--            in
--            li
--                [ class <| "dib pa3 v-mid pointer dim " ++ extraCs
--                , onClick <| SetPage page
--                ]
--                [ text label ]
--
--        navbarItems =
--            [ ( "Dashboard", Home ), ( "Admin", Admin ) ]
--
--        rightButton =
--            if haveAuthToken model.flux then
--                btn "Log out" <| Btns.PriLink "#"
--            else
--                span [] [ text "Log In" ]
--    in
--    div [ class "w-100 ph3 pv3 bg-white-90 black cf dt bb b--accent", id "navbar" ]
--        [ div [ class "dtc cf pa2 tl mh1 v-mid" ] [ branding BrandDark ]
--        , div [ class "fr tr" ]
--            [ ul [ class "dib pr3" ] <| map navbarTabLabel navbarItems
--            , rightButton
--            ]
--        ]
