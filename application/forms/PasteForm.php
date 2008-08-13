<?php
/**
 * New pastebin form
 * 
 * @uses    Zend_Dojo_Form
 * @package Paste
 * @license New BSD {@link http://framework.zend.com/license/new-bsd}
 * @version $Id: $
 */
class PasteForm extends Zend_Dojo_Form
{
    /**
     * @var array Programming languages with syntax highlighting
     */
    protected $_languages;

    /**
     * Initialize form
     * 
     * @return void
     */
    public function init()
    {
        $this->addPrefixPath('My_Form_Element', 'My/Form/Element/', 'element');

        $expiries = array(
            ''                => 'No expiration',
            60 * 15           => '15 minutes',
            60 * 60           => '1 hour',
            60 * 60 * 3       => '3 hours',
            60 * 60 * 6       => '6 hours',
            60 * 60 * 12      => '12 hours',
            60 * 60 * 24      => '1 day',
            60 * 60 * 24 * 3  => '3 days',
            60 * 60 * 24 * 7  => '1 week',
            60 * 60 * 24 * 30 => '1 month',
        );

        $languages = $this->_getLanguages();

        $this->setName('pasteform')
             ->setElementsBelongTo('paste-form');

        $this->addElement('FilteringSelect', 'type', array(
            'label'        => 'Language:',
            'multiOptions' => $languages,
            'required'     => true,
            'validators'   => array(
                array('InArray', true, array(array_keys($languages))),
            ),
        ));

        $this->addElement('ValidationTextBox', 'user', array(
            'label'        => 'Your name:',
            'regExp'       => '^[a-z][a-z0-9_-]+$',
            'validators'   => array(
                array('Regex', true, array('/^[a-z][a-z0-9_-]+$/i')),
            ),
        ));

        $this->addElement('SimpleTextarea', 'summary', array(
            'label'        => 'Summary:',
            'class'        => 'summaryTextarea',
        ));

        $this->addElement('FilteringSelect', 'expires', array(
            'label'        => 'Expiration:',
            'multiOptions' => $expiries,
            'validators'   => array(
                array('InArray', true, array(array_keys($expiries))),
            ),
        ));

        $this->addElement('SimpleTextarea', 'code', array(
            'label'    => 'Code:',
            'required' => true,
            'class'    => 'codeTextarea',
        ));

        $this->addElement('submitButton', 'save', array(
            'required'    => false,
            'ignore'      => true,
            'label'       => 'Save',
        ));

        $this->setDecorators(array(
            'FormElements',
            array('HtmlTag', array('tag' => 'dl')),
            'Form',
        ));
    }

    /**
     * Retrieve languages
     * 
     * @return array
     */
    protected function _getLanguages()
    {
        if (null === $this->_languages) {
            $cache = Zend_Registry::get('cache');
            if (!$languages = $cache->load('PasteForm_Languages')) {
                $config = Zend_Registry::get('config');
                $di = new DirectoryIterator($config->paths->libPath . '/geshi');
                $ri = new RegexIterator($di, '/\.php$/');
                $languages = array();
                foreach ($ri as $match) {
                    $file = $match->getFilename();
                    $lang = substr($file, 0, strlen($file) - 4);
                    $languages[$lang] = $lang;
                }
                $cache->save($languages, 'PasteForm_Languages', array('form', 'data'));
            }
            $this->_languages = $languages;
        }
        return $this->_languages;
    }
}
