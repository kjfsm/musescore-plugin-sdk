import QtQuick 2.15
import MuseScore 3.0

import "logic.js" as Logic

MuseScore {
  menuPath: "Plugins.Hello World"
  title: "Hello World"
  version: "0.1.0"
  description: "TypeScript で書かれた最小構成の MuseScore 4 プラグイン。"
  pluginType: "dock"
  requiresScore: false

  onRun: {
    Logic.run(curScore)
  }
}
