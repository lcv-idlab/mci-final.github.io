<?php

namespace Kirby\Panel;

use Kirby\Panel;

class Snippet extends View {

  public function __construct($file, $data = array()) {
    parent::__construct($file, $data);
    $this->_root = panel::instance()->roots()->snippets();
  }

}