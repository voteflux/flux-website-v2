module Flux.MemberUI.Msgs exposing (..)

import Flux.MemberUI.Models exposing (Page)
import Flux.Msgs exposing (FluxMsg)
import Helpers.Msgs exposing (HelperMsg)
import Material
import Material.Snackbar as Snack


type Msg
    = FMsg FluxMsg
    | HMsg (HelperMsg Msg)
    | SetPage Page
    | Mdl (Material.Msg Msg)
    | SelectTab Int
    | UpdateField Int String
    | MsgMap (List Msg)
    | DisableBtn Int
    | EnableBtn Int
    | Snack (Snack.Msg Int)
    | NOP
