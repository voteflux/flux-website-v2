module Flux.MemberUI.Views.AuthV exposing (..)

import Dict
import Flux.Auth exposing (haveAuthToken, isLoggedIn)
import Flux.MemberUI.Components.Buttons as Btns
import Flux.MemberUI.Components.Input as Input exposing (emailInput, textInput)
import Flux.MemberUI.Components.MdText as MdText exposing (heading)
import Flux.MemberUI.Models exposing (Model, Page(AuthLogin))
import Flux.MemberUI.Msgs exposing (Msg(..))
import Flux.MemberUI.Views.Generic exposing (notFoundView)
import Flux.Msgs exposing (FluxMsg(SendAuthEmail))
import Html exposing (Html, div, p, text)
import Html.Attributes exposing (class)
import Material.Card as Card
import Material.Color as Color
import Material.Elevation as Elevation
import Material.Options as Opts
import Material.Typography as Typo
import Maybe.Extra exposing ((?))


centerCard : List (Card.Block Msg) -> Html Msg
centerCard blocks =
    Card.view
        [ Opts.cs "center mt4"
        , Elevation.e2
        ]
        blocks


white_ =
    Color.text Color.white


sendAuthEmailId =
    34636


authBtnId =
    33756


needAuthView : Model -> Html Msg
needAuthView model =
    let
        emailAuthId =
            sendAuthEmailId

        email_ =
            Dict.get emailAuthId model.inputs ? ""

        msg =
            MsgMap [ FMsg <| SendAuthEmail email_, DisableBtn authBtnId ]
    in
    centerCard
        [ Card.title [] [ Card.head [] [ text "Please log in" ] ]
        , Card.text [] [ emailInput model emailAuthId "Enter Your Email" msg ]
        , Card.actions [ Card.border ]
            [ Opts.div [ Opts.cs "center" ]
                [ Btns.btn authBtnId model msg [ text "Send Login Link" ] ]
            ]
        ]


authInProgView : Model -> Html Msg
authInProgView model =
    centerCard
        [ Card.title [] [ Card.head [] [ text "Logging in..." ] ]
        , Card.text [] [ text "Authenticating with the Flux database..." ]
        ]


checkEmailView : Model -> Html Msg
checkEmailView model =
    centerCard
        [ Card.title [] [ Card.head [] [ text "Check your email" ] ]
        , Card.text [] [ text "We've sent you an email with your login link." ]
        ]


getAuthOrView : (Model -> Html Msg) -> Model -> Html Msg
getAuthOrView otherView model =
    let
        authProps =
            ( haveAuthToken model.flux
            , isLoggedIn model.flux
            , model.flux.checkEmail
            , model.page
            )
    in
    case authProps of
        ( _, _, _, AuthLogin s ) ->
            authInProgView model

        ( False, _, False, _ ) ->
            needAuthView model

        ( False, _, True, _ ) ->
            checkEmailView model

        ( True, False, _, _ ) ->
            authInProgView model

        ( True, True, _, _ ) ->
            otherView model
