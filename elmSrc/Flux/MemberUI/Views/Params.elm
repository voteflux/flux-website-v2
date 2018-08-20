module Flux.MemberUI.Views.Params exposing (..)

import Material.Color as Color exposing (Hue(DeepOrange, DeepPurple))


priColorH =
    DeepPurple


priColor =
    Color.color DeepPurple Color.S500


priColorDark =
    Color.color priColorH Color.S700


priColorLight =
    Color.color priColorH Color.S300


priColorLighter =
    Color.color priColorH Color.S50


secColorH =
    DeepOrange


secColor =
    Color.color DeepOrange Color.S500


secColorDark =
    Color.color secColorH Color.S700


secColorLight =
    Color.color secColorH Color.S300


secColorLighter =
    Color.color secColorH Color.S50
