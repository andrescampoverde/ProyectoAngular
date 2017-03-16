/*
 * Copyright (c) 2016.
 *  maniac787@gmail.com
 */

package ec.com.pyxme.i18n;

import java.io.Serializable;
import java.util.MissingResourceException;
import java.util.ResourceBundle;

/**
 * Created by Roberto Chasipanta on 9/4/16.
 */
public class ApplicationResources implements Serializable {

    private static ApplicationResources instance = new ApplicationResources();

    private static final String resourceNameAccess = "ec.com.pyxme.i18n.pyxme";
    private static ResourceBundle resourceBundle = ResourceBundle.getBundle(resourceNameAccess);

    private ApplicationResources(){}

    public static ApplicationResources getInstance() {
        return instance;
    }

    public static void setInstance(ApplicationResources instance) {
        ApplicationResources.instance = instance;
    }

    public String getString(String key) throws MissingResourceException{
        return resourceBundle.getString(key);
    }


    public Integer getInteger(String key) throws MissingResourceException {
        return Integer.valueOf(resourceBundle.getString(key));
    }
}